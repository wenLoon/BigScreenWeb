import React, { Component } from 'react';
import './timeLine.less';

export class TimeLine extends Component {

    render() {
        const { total = 1, progress = 1, timeList = [] } = this.props;
        const complete = (progress, total) => {
            if (progress > total) {
                progress = total;
            }
            let arr = [];
            for (let i = 1; i < total + 1; i++) {
                if (i < progress) {
                    arr.push(
                        <div key={i}>
                            <div className="number-complete"> √
                            <div className="number-words-weight">
                                    {timeList[i - 1]}
                                </div>
                            </div>
                            <div className="hr-complete" />
                        </div>
                    );
                } else if (i === progress) {
                    arr.push(
                        <div key={i} className="number-progress">{i}
                            <div className="number-words-weight">
                                {timeList[i - 1]}
                            </div>
                        </div>
                    );
                } else {
                    arr.push(
                        <div key={i}>
                            <div className={"hr-notstart"} />
                            <div className={"number-notstart"}>{i}
                                <div className={"number-words"}>
                                    {timeList[i - 1]}
                                </div>
                            </div>
                        </div>
                    );
                }
            }
            return arr;
        }
        return (
            <div>
                {/*  <div className="timeline">
                    {complete(progress, total)}
                </div> */}
                <div className="step-tars">
                    <div className="st-content">
                        <div className="stc-number">
                            <ul>
                                {timeList.map((v, n) => (
                                    <li className={progress === n + 1 ? "in-progress" : (progress > n + 1 ? "in-complete" : "")} key={n}>
                                        <div className="st-line"></div>
                                        <div className="cell">
                                            {
                                                v.img ? <img src={v.img} style={{ width: '36px', height: '36px' }} /> :
                                                <span>{progress > n + 1 ? "√" : n + 1}</span>
                                            }
                                            {
                                                v.vice ? <div className="vice">
                                                    <div>
                                                        <div className="st-vice"></div>
                                                        <div className="st-vice-row"></div>
                                                    </div>
                                                    {
                                                        v.img ? <img src={v.img} style={{ width: '36px', height: '36px', margin: '32px 9px 0 9px' }} /> :
                                                            <span className="st-vice-cell">{progress > n + 1 ? "√" : n + 1}</span>
                                                    }
                                                    <div>
                                                        <div className="st-vice-r"></div>
                                                        <div className="st-vice-row-r"></div>
                                                    </div>
                                                </div> : null
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* <div className="stc-number stc-title">
                            <ul>
                                {timeList.map((v, n) => <li className={progress === n + 1 ? "in-progress" : (progress > n + 1 ? "in-complete" : "")} key={n}>{v}</li>)}
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div >

        )
    }
}

export default TimeLine;
