import streamlit as st
import pdfplumber
from transformers import pipeline
import re

# Path to the pre-existing PDF file in the public folder
PDF_PATH = "./AI_Crusaders_Hackathon.pdf"

# Function to extract text from PDF using pdfplumber
def extract_text_from_pdf(pdf_path):
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        st.error(f"Error reading PDF: {e}")
        return ""

# Function to clean and preprocess the extracted text
def clean_text(text):
    # Removing extra spaces, newlines, and unwanted characters
    text = re.sub(r'\s+', ' ', text)  # Replace multiple spaces/newlines with a single space
    text = text.strip()  # Remove leading and trailing spaces
    return text

# Load the QA pipeline from Hugging Face
@st.cache_resource
def load_qa_pipeline():
    return pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

# Streamlit App
def main():
    st.title("📚 AI Crusaders")
    st.markdown("Ask questions based on the AI Crusaders Hackathon PDF document.")

    # Extract text from the predefined PDF
    pdf_text = extract_text_from_pdf(PDF_PATH)
    
    if pdf_text:
        cleaned_text = clean_text(pdf_text)
        
        st.success("PDF content loaded successfully!")
        
        # Ask questions based on PDF content
        st.markdown("### Ask a Question")
        question = st.text_input("Type your question:")
        
        if question:
            qa_pipeline = load_qa_pipeline()
            with st.spinner("Finding the answer..."):
                result = qa_pipeline({"question": question, "context": cleaned_text})
                st.markdown(f"**Answer:** {result['answer']}")
                
    else:
        st.error("Could not load the PDF content. Please check the file path.")

if __name__ == "__main__":
    main()