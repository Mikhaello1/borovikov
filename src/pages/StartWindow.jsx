import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import MyButton from "../components/UI/MyButton";
import { useNavigate, useNavigation } from "react-router";

export default function StartWindow() {
    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/importData');
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                flexDirection: "column",
                position: "relative"
            }}
        >
            <h1 style={{ width: "700px", position: "absolute", top: "50px"}}>
                Индивидуальное прогнозирование надёжности по постепенным отказам биполярных транзисторов большой мощности методом имитационых воздействий
            </h1>
            <h2>Ход работы:</h2>
            <div style={{ display: "flex" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontSize: "24px", border: "2px solid black", borderRadius: "50px", padding: "20px", marginRight: "20px" }}>Ввод данных</div>
                    <FaArrowRight fontSize={"30px"} />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                    <div style={{ fontSize: "24px", border: "2px solid black", borderRadius: "50px", padding: "20px", marginRight: "20px" }}>Создание моделей прогнозирования</div>
                    <FaArrowRight fontSize={"30px"} />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                    <div style={{ fontSize: "24px", border: "2px solid black", borderRadius: "50px", padding: "20px", marginRight: "20px" }}>Имитационная модель</div>
                    <FaArrowRight fontSize={"30px"} />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                    <div style={{ fontSize: "24px", border: "2px solid black", borderRadius: "50px", padding: "20px", marginRight: "20px" }}>Подсчет ошибки прогнозирования</div>
                </div>
            </div>

            <MyButton style={{position: "absolute", bottom: "100px", height: "80px", width: "250px", fontSize: "30px", borderRadius: "100px"}} onClick={handleStart}>
                    Начать работу
            </MyButton>
        </div>
    );
}
