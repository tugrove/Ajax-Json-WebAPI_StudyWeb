// HTML要素の取得
const BTN = document.getElementById(`btn`);
const PREFECTURE = document.getElementById(`prefecture`);
const CITY = document.getElementById(`city`);
const ADDRESS = document.getElementById(`address`);
const DIV_JS = document.getElementById(`js`);

// ボタンが押された時の処理
BTN.addEventListener(`click`, () => {
    // API用のURLを作成
    const ZIPCODE = document.getElementById(`zipcode`).value;
    const URL = urijoin`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${ZIPCODE}&callback=${cb_address.name}`;
    // API用のscript要素を追加して削除
    const SCRIPT_API = document.createElement(`script`);
    SCRIPT_API.type = `text/javascript`
    SCRIPT_API.src = URL;
    DIV_JS.insertBefore(SCRIPT_API, null);
    DIV_JS.removeChild(SCRIPT_API);
});


/* 関数定義 ---------------------------------- */
// URIを結合するための関数
const urijoin = (strings, ...values) => {
    const result = [];
    const I = strings.length - 1;
    for (let i = 0; i < I; i++) {
        result.push(strings[i], encodeURIComponent(values[i]));
    }
    result.push(strings[I]);
    return result.join(``);
};

// 住所検索APIのコールバック関数
const cb_address = data => {
    if (data.results) {
        // 取得したデータを各HTML要素に代入
        const tmp = data.results[0];
        PREFECTURE.value = tmp.address1; // 都道府県を代入
        CITY.value = tmp.address2;       // 市区町村を代入
        ADDRESS.value = tmp.address3;    // 住所を代入
    } else {
        // データが取得できなかった時の処理
        console.log(data);
        alert(`該当するデータが見つかりませんでした`);
    }
}
