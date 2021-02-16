/* HTMLを読み込んでからの処理 ------------------ */
$(
    // 検索ボタンをクリックした時の処理
    $(`#btn`).on(`click`, () => {
        const ZIPCODE = $(`#zipcode`).val();
        const URL = urijoin`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${ZIPCODE}`;
        $.ajax({
            url: URL,
            dataType: `jsonp`
        }).done( data => {
            // 通信に成功した時の処理
            if (data.results) {
                // 取得したデータを各HTML要素に代入
                const tmp = data.results[0];
                $(`#prefecture`).val(tmp.address1); // 都道府県を代入
                $(`#city`).val(tmp.address2);       // 市区町村を代入
                $(`#address`).val(tmp.address3);    // 住所を代入
            } else {
                // データが取得できなかった時の処理
                console.log(data);
                alert(`該当するデータが見つかりませんでした`);
            }
        }).fail( data => {
            // 通信に失敗した時の処理
            alert(`通信に失敗しました`);
        });
    })
);


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
