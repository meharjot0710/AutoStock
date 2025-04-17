from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os
import pickle

model = SentenceTransformer('all-MiniLM-L6-v2')

def build_vector_store(docs, save_path='vector_store'):
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    embeddings = model.encode(docs)
    dim = embeddings[0].shape[0]
    index = faiss.IndexFlatL2(dim)
    index.add(np.array(embeddings))

    with open(f'{save_path}/docs.pkl', 'wb') as f:
        pickle.dump(docs, f)
    faiss.write_index(index, f'{save_path}/index.faiss')

def retrieve(query, save_path='vector_store', top_k=3):
    with open(f'{save_path}/docs.pkl', 'rb') as f:
        docs = pickle.load(f)
    index = faiss.read_index(f'{save_path}/index.faiss')

    q_embedding = model.encode([query])
    D, I = index.search(q_embedding, top_k)

    return [docs[i] for i in I[0]]
