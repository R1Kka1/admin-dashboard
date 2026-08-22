import "./OperationLog.css";
import dayjs from "dayjs";
import {useLogs} from "../hooks/useLogs";
import { Loading } from "../components/Loading";

export function OperationLog() {
    const {logs,loading} = useLogs(); 

    if(loading){
        return <Loading />
    }
    
    return (
        <div className="logsTotal">
            <div className="logsTitles">
                <div>时间</div>
                <div>操作人</div>
                <div>操作</div>
                <div>对象</div>
                <div>详情</div>
            </div>
            <div className="logDetails">
                {
                    logs.map((eachLog) => {
                        return (
                            <div key={eachLog.id} className="logRow">
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