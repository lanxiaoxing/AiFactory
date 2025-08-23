import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>关于我们</h3>
            <ul>
              <li><a href="/公司简介">公司简介</a></li>
              <li><a href="/发展历程">发展历程</a></li>
              <li><a href="/企业文化">企业文化</a></li>
              <li><a href="/管理团队">管理团队</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>产品与服务</h3>
            <ul>
              <li><a href="/智能手机">智能手机</a></li>
              <li><a href="/平板电脑">平板电脑</a></li>
              <li><a href="/智能穿戴">智能穿戴</a></li>
              <li><a href="/技术支持">技术支持</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>制造服务</h3>
            <ul>
              <li><a href="/ODM制造">ODM制造</a></li>
              <li><a href="/OEM生产">OEM生产</a></li>
              <li><a href="/质量控制">质量控制</a></li>
              <li><a href="/供应链管理">供应链管理</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>联系我们</h3>
            <ul>
              <li><a href="/投资者关系">投资者关系</a></li>
              <li><a href="/媒体联系">媒体联系</a></li>
              <li><a href="/招聘信息">招聘信息</a></li>
              <li><a href="/全球办事处">全球办事处</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; 2024 手机制造. 保留所有权利。</p>
          </div>
          <div className={styles.legalLinks}>
            <a href="/隐私政策">隐私政策</a>
            <a href="/使用条款">使用条款</a>
            <a href="/网站地图">网站地图</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;