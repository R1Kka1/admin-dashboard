import './ChangeMessage.css';
interface ChangeMessageProps{
    result:"success" | "fail";
    close: () => void;
}

export function ChangeMessage({
    result,
    close
}:ChangeMessageProps) {
    return (
        <div className="addBtn-modal">
            <div className="change-Pop">
                <h2>
                    {result === "success"
                        ? "操作成功"
                        : "操作失败"}
                </h2>

                <button onClick={close}>
                    关闭
                </button>
            </div>
        </div>
    );
}