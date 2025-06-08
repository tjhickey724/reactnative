/* 
This app was created by using claude.ai with the following prompt,
and the resulting code was slightly modified...

I would like you to build a first version of a Mobile App using the React Native framework. 
The app is designed for people learning Brazilian Jiujitsu. 
The user starts by completing an initial profile with their name and belt. 
The app will keep track of the skill you know and the skills you are working on. 
The app will keep track of those skills and will recommend new skills for you to learn. 
The skills should be organized into groups, 
e.g. takedowns would contain single-leg, double-leg, hip-toss, etc; 
guard passing would contain torreando, knee cut, etc; 
sweeps would contain scissors sweep, pendulum sweep, tripod sweep, etc. 
The user should be able to move skills from the "working on" category to the "know" category, 
and to add new skills to the "working on" category.

*/
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const BJJSkillTracker = () => {
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [name, setName] = useState('');
  const [belt, setBelt] = useState(''); 
  const [profile, setProfile] = useState({ name: '', belt: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  
  // Initial skill database organized by categories
  const skillDatabase = {
    'Takedowns': ['Single Leg', 'Double Leg', 'Hip Toss', 'Ankle Pick', 'Foot Sweep', 'Seoi Nage'],
    'Guard Passing': ['Torreando Pass', 'Knee Cut Pass', 'Over-Under Pass', 'Stack Pass', 'X-Pass', 'Leg Drag'],
    'Sweeps': ['Scissors Sweep', 'Pendulum Sweep', 'Tripod Sweep', 'Flower Sweep', 'Hip Bump Sweep', 'Butterfly Sweep'],
    'Submissions': ['Armbar', 'Triangle', 'Rear Naked Choke', 'Guillotine', 'Kimura', 'Americana'],
    'Guard': ['Closed Guard', 'Open Guard', 'Half Guard', 'Spider Guard', 'De La Riva', 'X-Guard'],
    'Escapes': ['Mount Escape', 'Side Control Escape', 'Back Escape', 'Guard Recovery', 'Turtle Escape']
  };

  const [userSkills, setUserSkills] = useState({
    known: [],
    workingOn: []
  });

  const belts = ['White', 'Blue', 'Purple', 'Brown', 'Black'];

  // Get recommended skills based on belt level and current skills
  const getRecommendedSkills = () => {
    const allSkills = Object.values(skillDatabase).flat();
    const userAllSkills = [...userSkills.known, ...userSkills.workingOn];
    const available = allSkills.filter(skill => !userAllSkills.includes(skill));
    
    // For white belts, recommend basics from each category
    if (profile.belt === 'White') {
      return available.filter(skill => 
        ['Single Leg', 'Torreando Pass', 'Scissors Sweep', 'Armbar', 'Closed Guard', 'Mount Escape'].includes(skill)
      ).slice(0, 6);
    }
    
    // For other belts, return a mix of skills
    return available.slice(0, 8);
  };

  const moveSkillToKnown = (skill) => {
    setUserSkills(prev => ({
      known: [...prev.known, skill],
      workingOn: prev.workingOn.filter(s => s !== skill)
    }));
  };

  const addSkillToWorkingOn = (skill) => {
    if (!userSkills.workingOn.includes(skill) && !userSkills.known.includes(skill)) {
      setUserSkills(prev => ({
        ...prev,
        workingOn: [...prev.workingOn, skill]
      }));
    }
  };

  const removeSkillFromWorkingOn = (skill) => {
    setUserSkills(prev => ({
      ...prev,
      workingOn: prev.workingOn.filter(s => s !== skill)
    }));
  };

  const ProfileSetup = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Welcome to BJJ Tracker</Text>
        <Text style={styles.subtitle}>Set up your profile to get started</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>



        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Belt</Text>
          <View style={styles.pickerContainer}>
          <Picker
              selectedValue={belt}
                onValueChange={setBelt}
                style={styles.picker}
          >
          <Picker.Item label="Select your belt" value="" />
            {belts.map((belt) => (
              <Picker.Item key={belt} label={belt} value={belt} />
            ))}

          </Picker>
          
           
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, (!name || !belt) && styles.buttonDisabled]}
          onPress={() => name && belt && setCurrentScreen('main')}
          disabled={!name || !belt}
        >
          <Text style={styles.buttonText}>Start Training</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const MainApp = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BJJ Tracker</Text>
        <Text style={styles.headerSubtitle}>{profile.name} - {profile.belt} Belt</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Skills I Know */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills I Know ({userSkills.known.length})</Text>
          <View style={styles.skillsGrid}>
            {userSkills.known.map((skill, index) => (
              <View key={index} style={[styles.skillTag, styles.knownSkill]}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
            {userSkills.known.length === 0 && (
              <Text style={styles.emptyText}>No skills mastered yet. Keep training!</Text>
            )}
          </View>
        </View>

        {/* Skills I'm Working On */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Currently Working On ({userSkills.workingOn.length})</Text>
          <View style={styles.skillsGrid}>
            {userSkills.workingOn.map((skill, index) => (
              <View key={index} style={[styles.skillTag, styles.workingSkill]}>
                <Text style={styles.skillText}>{skill}</Text>
                <View style={styles.skillActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => moveSkillToKnown(skill)}
                  >
                    <Text style={styles.actionButtonText}>✓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => removeSkillFromWorkingOn(skill)}
                  >
                    <Text style={styles.actionButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {userSkills.workingOn.length === 0 && (
              <Text style={styles.emptyText}>No skills in progress. Add some skills to practice!</Text>
            )}
          </View>
        </View>

        {/* Recommended Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <View style={styles.skillsGrid}>
            {getRecommendedSkills().map((skill, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.skillTag, styles.recommendedSkill]}
                onPress={() => addSkillToWorkingOn(skill)}
              >
                <Text style={styles.skillText}>{skill}</Text>
                <Text style={styles.addIcon}>+</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Custom Skill Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Custom Skill</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Skill Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Skill</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                  style={styles.picker}
                >
                  <Picker.Item label="Select category" value="" />
                  {Object.keys(skillDatabase).map(category => (
                    <Picker.Item key={category} label={category} value={category} />
                  ))}
                </Picker>
              </View>
            </View>

            {selectedCategory && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Skill</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedSkill}
                    onValueChange={setSelectedSkill}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select skill" value="" />
                    {skillDatabase[selectedCategory]
                      .filter(skill => !userSkills.known.includes(skill) && !userSkills.workingOn.includes(skill))
                      .map(skill => (
                        <Picker.Item key={skill} label={skill} value={skill} />
                      ))}
                  </Picker>
                </View>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedCategory('');
                  setSelectedSkill('');
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, (!selectedSkill) && styles.buttonDisabled]}
                onPress={() => {
                  if (selectedSkill) {
                    addSkillToWorkingOn(selectedSkill);
                    setModalVisible(false);
                    setSelectedCategory('');
                    setSelectedSkill('');
                  }
                }}
                disabled={!selectedSkill}
              >
                <Text style={styles.modalButtonText}>Add Skill</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );

  return currentScreen === 'profile' ? <ProfileSetup /> : <MainApp />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  profileContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 40,
  },
  header: {
    backgroundColor: '#16213e',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  knownSkill: {
    backgroundColor: '#27ae60',
  },
  workingSkill: {
    backgroundColor: '#f39c12',
    justifyContent: 'space-between',
  },
  recommendedSkill: {
    backgroundColor: '#3498db',
    justifyContent: 'space-between',
  },
  skillText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
  },
  skillActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  removeButton: {
    backgroundColor: 'rgba(231,76,60,0.8)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  pickerContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8e44ad',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1a1a2e',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  confirmButton: {
    backgroundColor: '#27ae60',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BJJSkillTracker;
