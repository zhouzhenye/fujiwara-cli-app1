// 他のjsファイル(index_github.jsなど)を参考にして、
// JavaScriptコードをここに書く

// 1. ボタンがクリックされたときのイベントを追加
const button = document.getElementById("main");  // HTML中のボタン（id="main"）を検索
button.addEventListener("click", function () {
  const post_code = document.getElementById("zipcode").value;

  // 2. APIにリクエストを送り、レスポンスを受け取る
  get(post_code);
});

// 1. ここまで

// 2. APIにリクエストを送り、レスポンスを受け取る
function get(post_code) {
  // XMLHttpRequest(XHR)オブジェクトの初期化
  const request = new XMLHttpRequest();

  // URLを組み立てて、リクエストを準備する（まだリクエストは未送信）

  const url = `http://zipcloud.ibsnet.co.jp/api/search?zipcode=${post_code}`;  // テンプレートリテラルを使用（バッククォートで囲む）
  request.open("GET", url);

  // サーバからレスポンスが返ってきた場合の処理を登録
  request.addEventListener("load", function (event) {
    // エラーハンドリング：①HTTPステータスコードが「200 OK」以外の場合
    if (event.target.status !== 200) {
      console.log("Error: HTTPステータスが「200 OK」ではありません");
      console.log(`${event.target.status}: ${event.target.statusText}`);
      return;
    }

    // 正常時の処理：3. レスポンス（JSONテキスト）を加工し、DOMに追加する
    show(event);
  });

  // エラーハンドリング：②サーバとの通信に際してエラーが発生した場合
  request.addEventListener("error", () => {
    console.error("Error: サーバとの通信に失敗しました");
  });

  // リクエストを実際に送信する
  request.send();
}

// 3. レスポンス（JSONテキスト）を加工し、DOMに追加する
function show(event) {
  // コンソールへの出力
  console.log(`HTTPステータスコード: ${event.target.status}`);
  console.log("返ってきたJSONテキスト:");
  console.log(event.target.responseText);

  // レスポンス（JSONテキスト）を、JSON.parseメソッドで連想配列（オブジェクト）に変換する
  const text_json = event.target.responseText;  // レスポンステキスト（JSON）
  const response = JSON.parse(text_json);       // JSONテキストをJavaScriptのオブジェクトに変換

  // コンソールにオブジェクトをデバッグ用出力する
  console.dir(response);

  // responseを処理する
  // 連想配列（オブジェクト）のキーを取り出す
  console.log(response.results[0].address1);

}

// 3. ここまで
