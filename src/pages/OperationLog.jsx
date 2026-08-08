import "./OperationLog.css";
import dayjs from "dayjs";
import {useLogs} from "../hooks/useLogs.js";

export function OperationLog() {
    const {logs} = useLogs(); 

    
    return (
        <div className="operationLog-Page-Total">
            <div className="operationLog-Page-Title">
                <div>时间</div>
                <div>操作人</div>
                <div>操作</div>
                <div>对象</div>
                <div>详情</div>
            </div>
            <div className="operationLog-Page-Main">
                {
                    logs.map((eachLog) => {
                        return (
                            <div key={eachLog.id} className="eachLog-row">
                                <div>{dayjs(eachLog.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                                <div>{eachLog.operator}</div>
                                <div>{eachLog.action}</div>
                                <div>{eachLog.target}</div>
                                <div>{eachLog.detail}</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}