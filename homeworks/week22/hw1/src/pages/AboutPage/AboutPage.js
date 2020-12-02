import React from "react";
import styled from "styled-components";


const AboutContainer = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const AboutTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 10px 0px;
`;

const AboutContext = styled.div``;

const Article = styled.div`
  position: relative;
  padding: 10px;
  font-size: 24px;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  border-radius: 8px;
  left: 0px;
  top: 0px;
  opacity: 0.2;
`;

export default function AboutPage() {
  return (
    <AboutContainer>
      <AboutTitle>關於這個部落格</AboutTitle>
      <AboutContext>
        <Article>
          這是一個練習如何使用 React
          的簡易部落格，有簡單的登入功能，註冊功能，發表文章，首頁文章列表，點進去能看到單篇文章，首頁分頁功能，做了這些才發現老師說的細節很重要，有各種錯誤狀況要會懂的顯示出來，不過我都想不太到...應該是多去實作或是遇到才會注意到，但有時遇到就來不及了...，利用這些練習藉此來學習
          React
          基本使用方法，老師也說明會用了這些再去做延伸相信能應付大部分場面？
          在此也感謝 Huli
          老師的耐心地教導讓我學到了很多很多，離求職時間也不遠了，
          希望能夠一切順利～
          <Img src="https://i.ibb.co/ZgbZ99y/IMG-1753.jpg" />
        </Article>
      </AboutContext>
    </AboutContainer>
  );
}
