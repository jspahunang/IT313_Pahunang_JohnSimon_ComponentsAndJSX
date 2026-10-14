import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Functional component representing a single student roster card.
 * 
 * Requirement 1: Receives name, course, units, and isFullLoad as props using destructuring.
 * Requirement 2: Conditionally displays a "Full Load" label only when isFullLoad is true using {isFullLoad && <Text>...</Text>}.
 */
export default function StudentCard({ name, course, units, isFullLoad }) {
  // Local state to visibly demonstrate React's key-reconciliation behavior (Requirement 6)
  // When keys use student.id, checking "Present" stays with the student when the list is reversed.
  // When keys use array index, checking "Present" incorrectly stays at the index position.
  const [isPresent, setIsPresent] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{name ? name.charAt(0) : '?'}</Text>
        </View>

        <View style={styles.studentDetails}>
          <Text style={styles.studentName}>{name}</Text>
          <Text style={styles.courseText}>Course: <Text style={styles.courseValue}>{course}</Text></Text>
          <Text style={styles.unitsText}>Units Enrolled: <Text style={styles.unitsValue}>{units}</Text></Text>
        </View>

        {/* Requirement 2: Conditional rendering using JSX logical AND expression */}
        {isFullLoad && (
          <View style={styles.fullLoadBadge}>
            <Text style={styles.fullLoadText}>Full Load</Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.cardBottomRow}>
        <TouchableOpacity
          style={[styles.presentButton, isPresent && styles.presentButtonActive]}
          onPress={() => setIsPresent((prev) => !prev)}
          activeOpacity={0.7}
        >
          <Text style={[styles.presentButtonText, isPresent && styles.presentButtonTextActive]}>
            {isPresent ? '✓ Marked Present' : 'Mark as Present'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.statusSubtext}>
          {isFullLoad ? 'Eligible for honors' : 'Regular load'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4338CA',
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  courseText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  courseValue: {
    fontWeight: '600',
    color: '#334155',
  },
  unitsText: {
    fontSize: 14,
    color: '#64748B',
  },
  unitsValue: {
    fontWeight: '700',
    color: '#0F172A',
  },
  fullLoadBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#86EFAC',
    alignSelf: 'flex-start',
  },
  fullLoadText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  presentButton: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  presentButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4338CA',
  },
  presentButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  presentButtonTextActive: {
    color: '#FFFFFF',
  },
  statusSubtext: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
});
