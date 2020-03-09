import React, { Component } from 'react';
import ReactParticleLine from 'react-particle-line';
// import animate from 'animate.css';
import Header from './../Header/index';

import styles from './index.less';

export default class index extends Component {
    render() {
        return (
            <ReactParticleLine>
                <div className={styles.homeBox}>
                    <div className={styles.header}>
                        <Header />
                    </div>
                    {/* <div className={styles.topLeft}>
                        <Equipment />
                    </div>
                    <div className={`${styles.topCenter} ${animate.animated} ${animate.zoomIn}`}>
                        <Map />
                    </div>
                    <div className={styles.topRight}>
                        <Loan />
                    </div>
                    <div className={styles.bottomLeft}>
                        <Customer />
                    </div>
                    <div className={styles.bottomCenter}>
                        <Product />
                    </div>
                    <div className={styles.bottomRight}>
                        <Trading />
                    </div> */}
                </div>
            </ReactParticleLine>
        );
    }
}

