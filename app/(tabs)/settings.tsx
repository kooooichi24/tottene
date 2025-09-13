import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings as SettingsIcon,
  Bell,
  Camera,
  Image,
  Trash2,
  Info,
  Heart,
  Clock,
  Smartphone,
  ChevronRight,
} from 'lucide-react-native';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'toggle' | 'action' | 'info';
  value?: boolean;
  icon: React.ReactNode;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleClearData = () => {
    Alert.alert(
      'データを削除',
      'すべての写真と設定が削除されます。この操作は取り消せません。',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: () => {
            // In real app, this would clear local storage
            Alert.alert('完了', 'データが削除されました。');
          },
        },
      ],
    );
  };

  const settings: SettingItem[] = [
    {
      id: 'notifications',
      title: '通知を有効にする',
      subtitle: 'リマインド通知の送信',
      type: 'toggle',
      value: notificationsEnabled,
      icon: <Bell size={20} color="#ff6b6b" strokeWidth={2} />,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 'sound',
      title: '通知音',
      subtitle: '通知時にサウンドを再生',
      type: 'toggle',
      value: soundEnabled,
      icon: <Smartphone size={20} color="#6366f1" strokeWidth={2} />,
      onToggle: setSoundEnabled,
    },
    {
      id: 'vibration',
      title: 'バイブレーション',
      subtitle: '通知時に振動',
      type: 'toggle',
      value: vibrationEnabled,
      icon: <Clock size={20} color="#8b5cf6" strokeWidth={2} />,
      onToggle: setVibrationEnabled,
    },
    {
      id: 'camera-settings',
      title: 'カメラ設定',
      subtitle: '画質・保存形式の設定',
      type: 'action',
      icon: <Camera size={20} color="#10b981" strokeWidth={2} />,
      onPress: () => Alert.alert('準備中', 'この機能は開発中です。'),
    },
    {
      id: 'storage',
      title: 'ストレージ管理',
      subtitle: '写真の保存場所・容量確認',
      type: 'action',
      icon: <Image size={20} color="#f59e0b" strokeWidth={2} />,
      onPress: () => Alert.alert('準備中', 'この機能は開発中です。'),
    },
    {
      id: 'clear-data',
      title: 'データを削除',
      subtitle: 'すべての写真と設定を削除',
      type: 'action',
      icon: <Trash2 size={20} color="#ef4444" strokeWidth={2} />,
      onPress: handleClearData,
    },
    {
      id: 'about',
      title: 'アプリについて',
      subtitle: 'バージョン 1.0.0',
      type: 'info',
      icon: <Info size={20} color="#6b7280" strokeWidth={2} />,
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === 'info'}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>

      <View style={styles.settingRight}>
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#e5e7eb', true: '#fecaca' }}
            thumbColor={item.value ? '#ff6b6b' : '#9ca3af'}
          />
        )}
        {item.type === 'action' && (
          <ChevronRight size={20} color="#9ca3af" strokeWidth={2} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <SettingsIcon size={24} color="#ff6b6b" strokeWidth={2} />
            <Text style={styles.title}>設定</Text>
          </View>
          <Text style={styles.subtitle}>アプリの動作をカスタマイズ</Text>
        </View>

        {/* App Info Card */}
        <View style={styles.appInfoCard}>
          <Heart size={40} color="#ff6b6b" strokeWidth={1.5} />
          <View style={styles.appInfoText}>
            <Text style={styles.appName}>忘れられない日常を</Text>
            <Text style={styles.appTagline}>大切な瞬間を記録するお手伝い</Text>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.settingsContainer}>
          {settings.map(renderSettingItem)}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            このアプリは子育ての素敵な瞬間を{'\n'}
            記録するために作られました
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '400',
  },
  appInfoCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appInfoText: {
    marginLeft: 16,
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  settingsContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
  },
  settingRight: {
    marginLeft: 12,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 12,
    color: '#d1d5db',
    fontWeight: '500',
  },
});
