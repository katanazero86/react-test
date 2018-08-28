import React, {Component} from 'react';
import withAuth from "../../hoc/withAuth";
import PropTypes from "prop-types";
import './Deal.css'

import axios from 'axios';
import {connect} from "react-redux";
import * as actions from "../../actions";

const propTypes = {
    onLogin: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    dealInfo: PropTypes.object,
    dealList: PropTypes.array,
};

class Deal extends Component {

    constructor(props) {
        super(props)
        if (this.props.onLogin !== true) {
            this.props.history.push('/');
        }

        this.getDealAxios = this.getDealAxios.bind(this);
    }

    changeFormatNumberComma(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getDealAxios(requestPage) {
        axios({
            url: 'http://cms-staging-api.playwings.co.kr:8080/deals?page=' + requestPage,
            method: 'get',
            responseType: 'json',
            responseEncoding: 'utf8',
            headers: {
                Authorization: 'Bearer ' + localStorage.access_token,
            }
        }).then((response) => {
            console.log(response.data);
            console.log(response.data.content);
            this.props.handleGetDeal(response.data);
        }).catch((ex) => {
            console.log(ex);
        });
    }

    componentDidMount() {
        this.getDealAxios(this.props.currentPage);
    }

    render() {

        let linkData = [];
        if(this.props.dealInfo.hasOwnProperty('content')){
            let limitNum = this.props.currentPage + 9;

            if(limitNum > this.props.dealInfo.totalPages){
                limitNum = (this.props.dealInfo.totalPages - this.props.currentPage) + this.props.currentPage;
            }

            for(let i = this.props.currentPage; i<=limitNum; i++){
                if(this.props.currentPage === i){
                    linkData.push(<li key={i} className="page-item active" onClick={() => this.getDealAxios(i)}><a className="page-link">{i}</a></li>);
                }else{
                    linkData.push(<li key={i} className="page-item" onClick={() => this.getDealAxios(i)}><a className="page-link">{i}</a></li>);
                }

            }
        }

        return (
            <div className="deal-app">
                <div className="deal-app-box">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="deal-app-sub-title">Deal List</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label deal-app-search-label">Deal Search</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control-plaintext deal-search-input"/>
                                </div>
                                <button type="button" className="btn btn-outline-secondary deal-search-button">검색
                                </button>
                            </div>
                        </div>
                        <div className="col-sm col-custom">
                            <button type="button" className="btn btn-outline-secondary deal-export-button">Export
                            </button>
                        </div>
                    </div>
                    <div className="row row-contents">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">오픈</th>
                                <th scope="col">딜 종류</th>
                                <th scope="col">제목</th>
                                <th scope="col">여행사/항공사</th>
                                <th scope="col">광고대행사</th>
                                <th scope="col">목적지</th>
                                <th scope="col">메인가격</th>
                                <th scope="col">좋아요</th>
                                <th scope="col">댓글</th>
                                <th scope="col">노출 수</th>
                                <th scope="col">구매이동 수</th>
                                <th scope="col">링크</th>
                                <th scope="col">판매중</th>
                                <th scope="col">진행상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.dealList.map(deal =>
                                <tr id={deal.id} key={deal.id}>
                                    <th scope="row">{deal.id}</th>
                                    <td>{deal.nightDeal === false ? '주간' : '야간'}</td>
                                    <td></td>
                                    <td>{deal.title}</td>
                                    <td>{deal.company.name}</td>
                                    <td>{deal.adCompany.name}</td>
                                    <td>{deal.mainCityName}</td>
                                    <td>{this.changeFormatNumberComma(deal.mainPrice)}</td>
                                    <td>{this.changeFormatNumberComma(deal.likeCount)}</td>
                                    <td>{this.changeFormatNumberComma(deal.commentCount)}</td>
                                    <td>{this.changeFormatNumberComma(deal.viewCount)}</td>
                                    <td></td>
                                    <td><a href={deal.url} target="_blank">이동</a></td>
                                    <td>{deal.closed === false ? 'OFF' : 'ON'}</td>
                                    <td>
                                        <button type="button"
                                                className="btn btn-outline-secondary deal-switch-button">{deal.closed === false ? 'OFF' : 'ON'}</button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="paging-box">
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item" onClick={() => this.getDealAxios(1)}><a
                                            className="page-link">First</a></li>
                                        {this.props.dealInfo.first === true ?
                                            <li className="page-item" onClick={() => this.getDealAxios(1)}><a
                                                className="page-link">Previous</a></li> : <li className="page-item"
                                                                                              onClick={() => this.getDealAxios(this.props.currentPage - 1)}>
                                                <a className="page-link">Previous</a></li>}

                                        {linkData}
                                        {this.props.dealInfo.last === true ? <li className="page-item"
                                                                                 onClick={() => this.getDealAxios(this.props.dealInfo.totalPages)}>
                                            <a className="page-link">Next</a></li> : <li className="page-item"
                                                                                         onClick={() => this.getDealAxios(this.props.currentPage + 1)}>
                                            <a className="page-link">Next</a></li>}
                                        <li className="page-item"
                                            onClick={() => this.getDealAxios(this.props.dealInfo.totalPages)}><a
                                            className="page-link">Last</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// store 안의 state 값을 props 로 연결
const mapStateToProps = (state) => {
    console.log(state);
    return {
        currentPage: state.deal.currentPage,
        dealInfo: state.deal.dealInfo,
        dealList: state.deal.dealList
    };
};

/*
    액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결해줍니다.
*/
const mapDispatchToProps = (dispatch) => {
    return {
        handleGetDeal: (response) => {
            dispatch(actions.getDeal(response))
        },
    }
}

Deal.propTypes = propTypes;
Deal = connect(mapStateToProps, mapDispatchToProps)(Deal);

export default withAuth(Deal);