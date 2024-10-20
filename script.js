function toggleFiles(folderId) {
    const fileList = document.getElementById(folderId);
    fileList.style.display = fileList.style.display === "none" ? "block" : "none"; // トグル表示
}

// APIから現在の日付を取得して表示
document.getElementById("date").innerText = new Date().toLocaleDateString("ja-JP");

// 天気情報とニュースをAPIから取得
async function fetchWeatherAndNews() {
    try {
        // 天気APIを使用して東京の天気情報を取得
        const weatherResponse = await fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json'); // 東京（130000）の天気情報
        const weatherData = await weatherResponse.json();
        const tokyoWeather = weatherData[0].timeSeries[0].areas[0].weathers[0]; // 東京の天気
        document.getElementById("weather").innerText = `🌤️ ${tokyoWeather}`; // 天気情報を表示

        // ニュースAPIを使用
        const newsResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=qupGnPG8nM5MTllxIX9yjgpROUwsYD09RDaTwVMJ`);
        const newsData = await newsResponse.json();
        document.getElementById("news").innerText = `📰 ${newsData.articles[0].title}`; // ニュースタイトルを表示
    } catch (error) {
        console.error("APIエラー:", error);
    }
}

// ページ読み込み時に天気とニュースを取得
window.onload = fetchWeatherAndNews;
