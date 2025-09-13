import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Image as ImageIcon, 
  Download, 
  X, 
  Calendar,
  Heart,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Photo {
  id: string;
  uri: string;
  date: string;
  timestamp: number;
}

export default function AlbumScreen() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Mock data - in real app this would come from local storage
  const photos: Photo[] = [
    { id: '1', uri: 'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg', date: '2024/12/25', timestamp: Date.now() },
    { id: '2', uri: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg', date: '2024/12/24', timestamp: Date.now() - 86400000 },
    { id: '3', uri: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg', date: '2024/12/23', timestamp: Date.now() - 172800000 },
    { id: '4', uri: 'https://images.pexels.com/photos/1648375/pexels-photo-1648375.jpeg', date: '2024/12/22', timestamp: Date.now() - 259200000 },
    { id: '5', uri: 'https://images.pexels.com/photos/1648378/pexels-photo-1648378.jpeg', date: '2024/12/21', timestamp: Date.now() - 345600000 },
    { id: '6', uri: 'https://images.pexels.com/photos/1648374/pexels-photo-1648374.jpeg', date: '2024/12/20', timestamp: Date.now() - 432000000 },
  ];

  const openPhoto = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, selectedIndex - 1)
      : Math.min(photos.length - 1, selectedIndex + 1);
    
    setSelectedIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const exportPhoto = () => {
    // In real app, this would save to camera roll
    alert('写真をカメラロールに保存しました');
  };

  const renderPhoto = ({ item, index }: { item: Photo; index: number }) => (
    <TouchableOpacity 
      style={styles.photoItem}
      onPress={() => openPhoto(item, index)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      <View style={styles.photoOverlay}>
        <Text style={styles.photoDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  if (photos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ImageIcon size={24} color="#ff6b6b" strokeWidth={2} />
            <Text style={styles.title}>ギャラリー</Text>
          </View>
        </View>
        
        <View style={styles.emptyContainer}>
          <Heart size={64} color="#d1d5db" strokeWidth={1} />
          <Text style={styles.emptyTitle}>まだ写真がありません</Text>
          <Text style={styles.emptyMessage}>
            リマインド通知から{'\n'}最初の写真を撮影してみましょう
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ImageIcon size={24} color="#ff6b6b" strokeWidth={2} />
          <Text style={styles.title}>アルバム</Text>
        </View>
        <View style={styles.statsContainer}>
          <Calendar size={16} color="#6b7280" strokeWidth={2} />
          <Text style={styles.statsText}>{photos.length}枚の思い出</Text>
        </View>
      </View>

      <FlatList
        data={photos}
        renderItem={renderPhoto}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Photo Modal */}
      <Modal
        visible={!!selectedPhoto}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <X size={24} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.modalDate}>{selectedPhoto?.date}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={exportPhoto}>
              <Download size={24} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {selectedPhoto && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedPhoto.uri }} style={styles.fullImage} />
              
              {/* Navigation */}
              <View style={styles.navigationContainer}>
                <TouchableOpacity 
                  style={[styles.navButton, selectedIndex === 0 && styles.navButtonDisabled]}
                  onPress={() => navigatePhoto('prev')}
                  disabled={selectedIndex === 0}
                >
                  <ChevronLeft size={24} color={selectedIndex === 0 ? '#9ca3af' : '#ffffff'} strokeWidth={2} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.navButton, selectedIndex === photos.length - 1 && styles.navButtonDisabled]}
                  onPress={() => navigatePhoto('next')}
                  disabled={selectedIndex === photos.length - 1}
                >
                  <ChevronRight size={24} color={selectedIndex === photos.length - 1 ? '#9ca3af' : '#ffffff'} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  grid: {
    padding: 24,
    paddingTop: 8,
  },
  photoItem: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: (screenWidth - 64) / 2,
    backgroundColor: '#f3f4f6',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
  },
  photoDate: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  separator: {
    height: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  modalButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDate: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'contain',
  },
  navigationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});