async function fetchBooks(query) {
    const REST_API_KEY = '10e2838307b43cd8f09709c5c1a29f54';
    const params = new URLSearchParams({
        target: "title",
        query,
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
        const querys = ["계약 자매","오래오래 잘 부탁드립니다","닿을 수 없는 너","라이라이라이","마리엘 클라락의 약혼","엑소시스트를 타락시킬 수 없어","귀멸의 칼날","주술 회전","괴수8호","백년의 고독1"];

        for (let i=0; i<querys.length; i++) {
            const data = await fetchBooks(querys[i]);

            // .box 요소 전체 선택
            const boxElements = document.querySelectorAll(".two3 div");

            // documents 데이터를 각 box에 대응하여 렌더링            
            const doc = data.documents[0];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // <img>
            const img = document.createElement("img");
            img.src = doc.thumbnail;
            boxElements[i].appendChild(img);

            // <h3> 제목
            const h3 = document.createElement("h5");
            h3.textContent = doc.title;
            boxElements[i].appendChild(h3);
        }

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();
