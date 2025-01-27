import streamlit as st
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime, timedelta

# Function to calculate similarity between two sets of skills
def get_skill_similarity(mentor_skills, mentee_skills):
    vectorizer = TfidfVectorizer(stop_words='english')
    combined_skills = [mentor_skills, mentee_skills]
    skill_matrix = vectorizer.fit_transform(combined_skills)
    similarity = cosine_similarity(skill_matrix[0:1], skill_matrix[1:2])
    return similarity[0][0]

# Function to assign mentors to mentees
def assign_mentors(mentor_data, mentee_data):
    assignments = []
    
    # Calculate skill similarity between each mentor and mentee
    for _, mentee in mentee_data.iterrows():
        best_match = None
        best_similarity = 0
        for _, mentor in mentor_data.iterrows():
            similarity = get_skill_similarity(mentor['skills'], mentee['skills'])
            if similarity > best_similarity:
                best_similarity = similarity
                best_match = mentor
        
        assignments.append({
            'Mentee': mentee['name'],
            'Assigned Mentor': best_match['name'],
            'Available Schedule': best_match['available_schedule'],
        })
    
    return pd.DataFrame(assignments)

# Function to assign time slots to mentor-mentee pairs based on duration
def assign_time_slots(assignments, duration):
    time_slots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']
    slot_index = 0
    time_slot_range = []

    for idx, assignment in assignments.iterrows():
        start_time_str = time_slots[slot_index]
        start_time = datetime.strptime(start_time_str, "%I:%M %p")
        end_time = start_time + timedelta(minutes=duration)

        # Assign the time range for the meeting
        start_time_str = start_time.strftime("%I:%M %p")
        end_time_str = end_time.strftime("%I:%M %p")
        time_slot_range.append(f"{start_time_str} - {end_time_str}")

        slot_index = (slot_index + 1) % len(time_slots)
    
    assignments['Time Slot'] = time_slot_range
    return assignments

# Streamlit interface
st.title('Mentor-Mentee Assignment System')

# Upload Excel files
mentor_file = st.file_uploader("Upload Mentor Data (Excel)", type=["xlsx"])
mentee_file = st.file_uploader("Upload Mentee Data (Excel)", type=["xlsx"])

# Input for duration of each meeting
duration = st.number_input("Enter the meeting duration (in minutes)", min_value=30, max_value=120, value=60, step=15)

if mentor_file is not None and mentee_file is not None:
    mentor_data = pd.read_excel(mentor_file)
    mentee_data = pd.read_excel(mentee_file)

    
    
    # Ensure the data contains the expected columns
    if 'name' in mentor_data.columns and 'skills' in mentor_data.columns and 'available_schedule' in mentor_data.columns and 'name' in mentee_data.columns and 'skills' in mentee_data.columns:
        # Assign mentors to mentees based on skill similarity
        assignments = assign_mentors(mentor_data, mentee_data)
        
        # Assign time slots based on duration
        assignments_with_time_slots = assign_time_slots(assignments, duration)
        
        st.write("Mentor-Mentee Assignments with Time Slots", assignments_with_time_slots.drop(columns=['Available Schedule']))
    else:
        st.error("Ensure the mentor and mentee data contains 'name', 'skills', and 'available_schedule' columns")
