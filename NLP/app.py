from flask import Flask, request, jsonify
import nltk
import spacy
from spacytextblob.spacytextblob import SpacyTextBlob
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

# Initialize spaCy with the SpacyTextBlob component
nlp = spacy.load('en_core_web_sm')
nlp.add_pipe('spacytextblob', last=True)

# Initialize VADER SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

def interpret_vader_scores(scores):
    """ Convert VADER's numerical score to a descriptive category. """
    compound = scores['compound']
    print(compound)
    if compound >= 0.05:
        return 'Positive'
    elif compound > -0.05 and compound < 0.05:
        return 'Neutral'
    else:
        return 'Negative'

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Processing with spaCy
    doc = nlp(text)
    entities = [{'text': entity.text, 'type': entity.label_} for entity in doc.ents]

    # VADER Sentiment Analysis
    vader_scores = sia.polarity_scores(text)
    descriptive_sentiment = interpret_vader_scores(vader_scores)

    # TextBlob Analysis for significant words
    blob = TextBlob(text)
    significant_words = [
        {'word': word, 'significance': 'Positive' if word_blob.sentiment.polarity > 0 else 'Negative', 'polarity': word_blob.sentiment.polarity}
        for word, pos in blob.tags
        if pos in ['JJ', 'JJR', 'JJS', 'RB', 'RBR', 'RBS', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
        and abs((word_blob := TextBlob(word)).sentiment.polarity) > 0.1
    ]
    # significant_words = set(significant_words)

    # Compile results
    results = {
        'vader_sentiment': descriptive_sentiment,
        'vader_raw_scores': vader_scores,
        'significant_words': significant_words,
        'named_entities': entities
    }
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
