import subprocess
from rag_retriever import retrieve

def generate_answer(query):
    context_docs = retrieve(query)
    context = "\n".join(context_docs)

    prompt = f"""Use the following context to answer the question:
    
    Context:
    {context}

    Question: {query}
    """

    result = subprocess.run(
        ['ollama', 'run', 'mistral'],
        input=prompt.encode(),
        stdout=subprocess.PIPE
    )

    return result.stdout.decode().strip()
