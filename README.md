#
지난주 목요일에 뭐 먹었더라..?

## 개요

메모를 여기저기 하다보면, 언제 어떤 메모를 했는지, 어떤 일을 했는지 잊어버리곤 합니다. <br />
이 앱은 그 블랙박스를 메워주는 서비스입니다.
```
유저: "지난 주말에 갔던 카페가 어디야?"
AI: "OO 커피 입니다."
```

## 기술 스택

- Next.js
- TypeScript
- Supabase (Vector DB)
- TailwindCSS
- ChatGPT Embedding

## 다이어그램

<img width="1213" alt="스크린샷 2024-08-30 오후 4 17 59" src="https://github.com/user-attachments/assets/6c310065-5e42-4487-b674-8f07283f9859">

## 설계 프로세스

1. Supabase + Next.js 구성
2. 테이블 생성
    - activities
    - activity_embeddings
3. 활동 입력 페이지 제작
    - 유저 인풋
    - activities 테이블에 유저 활동 기록 업로드
    - 임베딩 생성 및 activity_embeddings 테이블에 업로드
4. 검색 및 답변 페이지 제작
    - 유저 인풋
    - PostgreSQL을 활용한 semantic search 함수 제작
    - 맥락 정보를 바탕으로 답변하는 LLM 세팅

## 개선점

- 사용자의 질문 및 답변을 기억해서 더 나은 UX 제공
- Claude의 Prompt Caching을 활용한 비용 절감
- Semantic search에서 chunk 단위로 가져올 수 있도록 적절한 chunking (langchain)
