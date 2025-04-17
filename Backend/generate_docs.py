from rag_retriever import build_vector_store

docs = [
    "Item_1 in Store_5 has a very high demand forecast for the next 2 weeks.",
    "Item_4 is running out of stock in Store_2 and Store_3.",
    "Restocking should be prioritized for items with high lag sales trend.",
]

build_vector_store(docs)
print("✅ Vector store saved to vector_store/docs.pkl")
