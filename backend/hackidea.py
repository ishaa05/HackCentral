import google.generativeai as genai  # type: ignore
import streamlit as st  # type: ignore

# Configure the API key
API_KEY = "AIzaSyAuv_bti3piCFoJde_MWi2Ee-xSIBfyRGc"
genai.configure(api_key=API_KEY)

# Function to generate project ideas
def idea_generator(skillset, trends, challenges):
    prompt = (f"Based on the following skills: {skillset}, current trends: {trends}, and challenges: {challenges}, "
              "generate innovative project ideas. Focus on creating impactful solutions that address these trends and challenges.")

    model = genai.GenerativeModel("gemini-pro")
    chat = model.start_chat(history=[])

    response = chat.send_message(prompt, stream=True)
    generated_ideas = ""

    for chunk in response:
        generated_ideas += chunk.text
    
    return generated_ideas.strip()

# Streamlit app layout
st.title("AI-Powered Idea Generator")

# Input fields for skillset, trends, and challenges
skillset = st.text_area("Enter your team's skillset (e.g., programming languages, frameworks, etc.):")
trends = st.text_area("Enter current trends or technologies you are interested in (e.g., AI, sustainability, etc.):")
challenges = st.text_area("Enter the challenges you want to address (e.g., climate change, healthcare, etc.):")

if st.button("Generate Ideas"):
    if skillset and trends and challenges:
        project_ideas = idea_generator(skillset, trends, challenges)
        st.subheader("Project Ideas:")
        st.write(project_ideas)
    else:
        st.warning("Please fill in all fields to generate project ideas.")
