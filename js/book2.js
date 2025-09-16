async function fetchBooks(query) {
    const REST_API_KEY = '10e2838307b43cd8f09709c5c1a29f54';
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 20
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}

async function bookData() {
    try {
        const querys = ["자바스크립트", "강아지","고양이","귀멸의 칼날","진격의 거인","인생","요리"];

        for (let i=0; i < 9; i++) {
            const data = await fetchBooks("귀멸의칼날");
            console.log(data);

            // .box 요소 전체 선택
            const boxElements = document.querySelectorAll(".two3 div");
            console.log(boxElements)

            // documents 데이터를 각 box에 대응하여 렌더링

            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // <img>
            const img = document.createElement("img");
            img.src = doc.thumbnail;
            boxElements[i].appendChild(img);

            // <h3> 제목
            const h3 = document.createElement("h3");
            h3.textContent = doc.title;
            boxElements[i].appendChild(h3);

            // <h6> 저자
            const h6 = document.createElement("h6");
            h6.textContent = doc.authors;
            boxElements[i].appendChild(h6);


        }
    

    } catch (error) {
        console.log('에러발생', error);
    }
}
bookData();
