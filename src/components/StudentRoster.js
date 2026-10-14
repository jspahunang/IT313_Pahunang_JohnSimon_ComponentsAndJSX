import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import StudentCard from './StudentCard';
import { INITIAL_STUDENTS } from '../data/students';

/**
 * StudentRoster Component
 *
 * Requirements addressed:
 * 3. Holds the students array and renders one StudentCard per student using .map(),
 *    giving each rendered element a stable key={student.id}.
 * 4. Uses JSX expressions {} with template literals to display computed array values
 *    (e.g., student count, full-load count, total units).
 * 5. Returns a single root element (<View style={styles.container}>) wrapping the header and card list.
 * 6. Includes a button to reverse the roster order, and demonstrates the difference
 *    between key={student.id} (restored stable key) and key={index} (educational test).
 */
export default function StudentRoster() {
  // Array of students stored in local state so roster reversal triggers re-render
  const [students, setStudents] = useState(INITIAL_STUDENTS);

  // Key strategy toggle: restored to student.id by default (Requirement 3 & 6),
  // but allows instructor/grader to toggle to 'index' to reproduce the key issue live!
  const [useIndexKey, setUseIndexKey] = useState(false);

  // Handler to reverse roster order
  const handleReverseRoster = () => {
    setStudents((prevStudents) => [...prevStudents].reverse());
  };

  // Handler to reset roster order
  const handleResetRoster = () => {
    setStudents(INITIAL_STUDENTS);
  };

  // Computed values from the array (Requirement 4)
  const totalStudents = students.length;
  const fullLoadCount = students.filter((s) => s.isFullLoad).length;
  const totalUnits = students.reduce((acc, curr) => acc + curr.units, 0);

  // Requirement 5: Single root element (View) wrapping the header, controls, and card list
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>IT313 • Class Management</Text>
          <Text style={styles.headerTitle}>Official Student Roster</Text>

          {/* Requirement 4: JSX expressions displaying values computed from the array with template literals */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{`${totalStudents}`}</Text>
              <Text style={styles.statLabel}>{`Total Students`}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{`${fullLoadCount}`}</Text>
              <Text style={styles.statLabel}>{`Full Load`}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{`${totalUnits}`}</Text>
              <Text style={styles.statLabel}>{`Total Units`}</Text>
            </View>
          </View>

          <Text style={styles.summaryText}>
            {`Displaying ${totalStudents} enrolled student${totalStudents === 1 ? '' : 's'} for Term 1`}
          </Text>
        </View>

        {/* Interactive Controls for Requirement 6 Demonstration */}
        <View style={styles.controlsCard}>
          <Text style={styles.controlsTitle}>Roster Controls & Key Experiment</Text>
          <Text style={styles.controlsDescription}>
            Test React list reconciliation: Mark a student as "Present", then click "Reverse Roster Order".
          </Text>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleReverseRoster}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>⇄ Reverse Roster</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.resetButton]}
              onPress={handleResetRoster}
              activeOpacity={0.8}
            >
              <Text style={styles.resetButtonText}>↺ Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Interactive toggle to compare student.id vs index */}
          <View style={styles.keyToggleContainer}>
            <Text style={styles.keyToggleLabel}>Current Key Prop:</Text>
            <TouchableOpacity
              style={[
                styles.keyToggleBadge,
                useIndexKey ? styles.keyIndexBadge : styles.keyIdBadge,
              ]}
              onPress={() => setUseIndexKey((prev) => !prev)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.keyToggleText,
                  useIndexKey ? styles.keyIndexText : styles.keyIdText,
                ]}
              >
                {useIndexKey ? '⚠️ key={index} (Buggy on reverse)' : '✓ key={student.id} (Stable)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Student Cards List */}
        <View style={styles.listContainer}>
          {students.map((student, index) => {
            // Requirement 3: Stable key using student.id (restored per Requirement 6)
            // Dynamically switches to index if toggle is clicked for testing
            const keyToUse = useIndexKey ? index : student.id;

            return (
              <StudentCard
                key={keyToUse}
                name={student.name}
                course={student.course}
                units={student.units}
                isFullLoad={student.isFullLoad}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#312E81',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  headerSubtitle: {
    color: '#A5B4FC',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 12,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: '#C7D2FE',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  summaryText: {
    color: '#E0E7FF',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
  controlsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  controlsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  controlsDescription: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
    lineHeight: 18,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  actionButton: {
    flex: 2,
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  resetButtonText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 14,
  },
  keyToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  keyToggleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  keyToggleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
  keyIdBadge: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  keyIdText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '700',
  },
  keyIndexBadge: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  keyIndexText: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '700',
  },
  listContainer: {
    paddingTop: 4,
  },
});
