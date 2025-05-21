import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type ProfilePageUserCardProps = {
  name: string|undefined;
  email: string|undefined;
  profileImage: string;
  onQuit: () => void;
};

const ProfilePageUserCard: React.FC<ProfilePageUserCardProps> = ({
  name,
  email,
  profileImage,
  onQuit
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
        <View style={styles.infoAndButton}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <TouchableOpacity onPress={onQuit} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E3A8A',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  infoAndButton: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  logoutButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default ProfilePageUserCard;
