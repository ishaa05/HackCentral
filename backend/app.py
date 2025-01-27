import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import MultiLabelBinarizer
import yagmail

# Custom styling
st.markdown(
    """
<style>
    .stTitle {
        color: #FF5A05;
        font-size: 2.5rem !important;
        padding-bottom: 2rem;
    }
    .section-header {
        color: #360498;
        font-size: 1.5rem;
        padding: 1rem 0;
        border-bottom: 2px solid #6C1FC9;
        margin-bottom: 1rem;
    }
    .recommendation-card {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        border-left: 4px solid #FF5A05;
    }
</style>
""",
    unsafe_allow_html=True,
)

def preprocess_data(data):
    mlb_skills = MultiLabelBinarizer()
    mlb_interests = MultiLabelBinarizer()

    data['Skills'] = data['Skills'].apply(lambda x: x.split(','))
    data['Interests'] = data['Interests'].apply(lambda x: x.split(','))

    skills_encoded = mlb_skills.fit_transform(data['Skills'])
    interests_encoded = mlb_interests.fit_transform(data['Interests'])

    data_encoded = pd.concat(
        [
            data.reset_index(drop=True),
            pd.DataFrame(skills_encoded, columns=mlb_skills.classes_),
            pd.DataFrame(interests_encoded, columns=mlb_interests.classes_),
        ],
        axis=1,
    )

    return data_encoded, mlb_skills, mlb_interests


def recommend_students_based_on_similarity(data, hardcoded_skill, hardcoded_interest, hardcoded_location, participation, k=5):
    # Ensure consistent column order for skills and interests
    skills_columns = list(mlb_skills.classes_)
    interests_columns = list(mlb_interests.classes_)

    # Create feature vector for hardcoded values, using full column list
    skills_encoded = np.zeros(len(skills_columns))
    for skill in hardcoded_skill.split(','):
        skill = skill.strip()
        if skill in skills_columns:
            skills_encoded[skills_columns.index(skill)] = 1

    interests_encoded = np.zeros(len(interests_columns))
    for interest in hardcoded_interest.split(','):
        interest = interest.strip()
        if interest in interests_columns:
            interests_encoded[interests_columns.index(interest)] = 1

    hardcoded_vector = np.concatenate([skills_encoded, interests_encoded])

    # Compute similarity score (using Euclidean distance)
    def calculate_similarity(row):
        try:
            row_vector = np.concatenate(
                [
                    row[skills_columns].values,
                    row[interests_columns].values,
                ]
            )
            return np.linalg.norm(hardcoded_vector - row_vector)
        except Exception as e:
            return np.inf

    data['similarity_score'] = data.apply(calculate_similarity, axis=1)

    # Sort by similarity score and select top k matches
    recommendations = data.sort_values(by='similarity_score', ascending=True).head(k)

    return recommendations[['Name', 'Skills', 'Interests', 'Location', 'Participation', 'similarity_score']]


def send_email_yagmail(recipient_email, recipient_name):
    sender_email = "dcmaureenmiranda@gmail.com"  # Replace with your email
    app_password = "jlej tfht ygjs zsrn"    # Replace with your App Password (Gmail/SMTP)

    subject = "Request to join team"
    body = f"Hi {recipient_name},\n\nI would like to join your team. Please let me know how I can contribute.\n\nBest Regards."

    try:
        yag = yagmail.SMTP(sender_email, app_password)
        yag.send(to=recipient_email, subject=subject, contents=body)
    except Exception as e:
        print(f"Failed to send email: {e}")

@st.cache_data
def load_data(file_path):
    try:
        data = pd.read_excel(file_path)
        return data
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return None


# Initialize session state
if "recommendations" not in st.session_state:
    st.session_state.recommendations = None
if "hardcoded_recommendations" not in st.session_state:
    st.session_state.hardcoded_recommendations = None
if "num_teammates" not in st.session_state:
    st.session_state.num_teammates = 3

st.title("Team Mates Recommender")

tab1, tab2 = st.tabs(["🎯 Custom Search", "🎨 Personal Recommendations"])

file_path = "compatible_dataset.xlsx"
data = load_data(file_path)

if data is not None:
    data, mlb_skills, mlb_interests = preprocess_data(data)

    with tab1:
        st.markdown('<p class="section-header">Find Your Perfect Team</p>', unsafe_allow_html=True)

        input_skills = st.multiselect("🔧 Select Required Skills:", options=mlb_skills.classes_)
        input_interests = st.multiselect("🎯 Select Areas of Interest:", options=mlb_interests.classes_)
        location = st.text_input("📍 Preferred Location:", placeholder="e.g., New York")
        participation = st.slider("📊 Participation Level:", min_value=1, max_value=10, value=5)

        if st.button("🔍 Find Team Mates", key="search_button"):
            if input_skills and input_interests and location:
                try:
                    st.session_state.recommendations = recommend_students_based_on_similarity(data, ','.join(input_skills), ','.join(input_interests), location, participation)
                except Exception as e:
                    st.error(f"Error processing recommendations: {e}")
            else:
                st.error("❌ Please provide all inputs: skills, interests, and location.")

        if st.session_state.recommendations is not None:
            st.markdown('<p class="section-header">🌟 Recommended Matches</p>', unsafe_allow_html=True)
            for i, (_, student) in enumerate(st.session_state.recommendations.iterrows()):
                st.markdown(f"""
                <div class="recommendation-card">
                    <h3 style="color: #360498">{student['Name']}</h3>
                    <p><strong>Skills:</strong> {', '.join(student['Skills'])}</p>
                    <p><strong>Interests:</strong> {', '.join(student['Interests'])}</p>
                    <p><strong>Location:</strong> {student['Location']}</p>
                </div>
                """, unsafe_allow_html=True)
                if st.button(f"📧 Connect with {student['Name']}", key=f"connect_{student['Name']}_{i}"):
                    try:
                        send_email_yagmail('maureen.miranda.22@spit.ac.in', student['Name'])
                        st.success(f"📧 Email successfully sent to {student['Name']}!")
                    except Exception as e:
                        st.error(f"❌ Failed to send email: {e}")
    
    with tab2:
        st.markdown('<p class="section-header">Quick Match</p>', unsafe_allow_html=True)
        
        st.session_state.num_teammates = st.number_input(
            "👥 Team Size:", 
            min_value=1, 
            max_value=10, 
            value=st.session_state.num_teammates
        )
        
        if st.button("✨ Get Personal Recommendations"):
            try:
                # Hardcoded values for skill, interest, and location
                hardcoded_skill = "SQL, Database Management"
                hardcoded_interest = "Algorithms, Problem Solving"
                hardcoded_location = "Tokyo"
                
                recommendations = recommend_students_based_on_similarity(data, hardcoded_skill, hardcoded_interest, hardcoded_location, participation)
                st.session_state.hardcoded_recommendations = recommendations.head(st.session_state.num_teammates)
            except Exception as e:
                st.error(f"❌ Error: {e}")

        # Display hardcoded recommendations with styling
        if st.session_state.hardcoded_recommendations is not None:
            st.markdown('<p class="section-header">✨ Personal Matches</p>', unsafe_allow_html=True)
            styled_df = st.session_state.hardcoded_recommendations.style\
                .format({'similarity_score': '{:.2f}'})\
                .background_gradient(subset=['similarity_score'], cmap='YlOrRd')
            st.dataframe(styled_df)
