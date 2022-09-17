import React from 'react';
import {Dropdown, Menu} from "antd";
import * as Images from "../../public/Images";
import Bus from "../../utils/Event";
import './index.css'

export const TinyStar = ({selectDirectory, playAll, refreshData, deleteData, changeColor, checkUpdate}) => {

    const menu = (
        <Menu>
            <Menu.Item key={"directory"}>
                <a onClick={selectDirectory}>选择曲库</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={"port"}>
                <a onClick={() => Bus.emit("onTapLogo")}>设置端口</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={"theme"}>
                <a onClick={changeColor}>设置主题</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={"playAll"}>
                <a onClick={playAll}>全部播放</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={"deleteData"}>
                <a onClick={deleteData}>清理数据</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={"refreshData"}>
                <a onClick={refreshData}>更新数据</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key={"checkUpdate"}>
                <a onClick={checkUpdate}>检查更新</a>
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            <div className={"star_container"}>
                <div className={"shooting_star"}/>
            </div>

            <div className={"star_container"}>
                <Dropdown overlay={menu} placement="bottomCenter">
                    <img
                        className={"tiny_star"}
                        src={Images.ICON_SETTING}
                        width={"30rem"}
                        height={"30rem"}
                    />
                </Dropdown>
            </div>
        </>
    )
}
