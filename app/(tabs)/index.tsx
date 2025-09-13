import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Plus, Clock, Calendar, Heart } from 'lucide-react-native';

interface NotificationTime {
  id: string;
  time: string;
  days: string[];
  frequency: string;
  enabled: boolean;
}

export default function HomeScreen() {
  const [notifications, setNotifications] = useState<NotificationTime[]>([
    {
      id: '1',
      time: '09:00',
      days: ['月', '水', '金'],
      frequency: '毎週',
      enabled: true,
    },
    {
      id: '2',
      time: '15:30',
      days: ['土', '日'],
      frequency: '毎週',
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Heart size={28} color="#ff6b6b" strokeWidth={2} />
            <Text style={styles.title}>忘れられない日常を</Text>
          </View>
          <Text style={styles.subtitle}>大切な瞬間を逃さないように</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>撮影した写真</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89%</Text>
            <Text style={styles.statLabel}>撮影成功率</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>連続記録日</Text>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#374151" strokeWidth={2} />
            <Text style={styles.sectionTitle}>リマインド設定</Text>
          </View>

          {notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <View style={styles.notificationHeader}>
                <View style={styles.timeContainer}>
                  <Clock size={16} color="#6b7280" strokeWidth={2} />
                  <Text style={styles.timeText}>{notification.time}</Text>
                </View>
                <Switch
                  value={notification.enabled}
                  onValueChange={() => toggleNotification(notification.id)}
                  trackColor={{ false: '#e5e7eb', true: '#fecaca' }}
                  thumbColor={notification.enabled ? '#ff6b6b' : '#9ca3af'}
                />
              </View>
              <View style={styles.notificationDetails}>
                <View style={styles.daysContainer}>
                  {notification.days.map((day) => (
                    <View key={day} style={styles.dayChip}>
                      <Text style={styles.dayText}>{day}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.frequencyText}>
                  {notification.frequency}
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#ff6b6b" strokeWidth={2} />
            <Text style={styles.addButtonText}>新しいリマインドを追加</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Photos Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color="#374151" strokeWidth={2} />
            <Text style={styles.sectionTitle}>最近の写真</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recentPhotos}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} style={styles.photoPreview}>
                <View style={styles.photoPlaceholder}>
                  <Heart size={24} color="#d1d5db" strokeWidth={1} />
                </View>
                <Text style={styles.photoDate}>12/25</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Motivational Message */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            今日も素敵な瞬間を{'\n'}記録しましょう ✨
          </Text>
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
  statsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ff6b6b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 8,
  },
  notificationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dayChip: {
    backgroundColor: '#fef3f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  dayText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
  frequencyText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fecaca',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '600',
    marginLeft: 8,
  },
  recentPhotos: {
    marginTop: 8,
  },
  photoPreview: {
    marginRight: 12,
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoDate: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  motivationCard: {
    backgroundColor: '#fff7ed',
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  motivationText: {
    fontSize: 16,
    color: '#ea580c',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
});
