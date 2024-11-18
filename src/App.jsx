import styles from "./app.module.css";
import { useState } from "react";

export const App = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");

	const onInputButtonClick = () => {
		const promptValue = window.prompt("Введите значение");

		if (promptValue.length < 3) {
			setError("Введенное значение должно содержать минимум 3 символа");
		} else {
			setValue(promptValue);
			setError("");
		}
	};

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			const currentDate = new Date();
			const dateString = currentDate.toLocaleString("ru-RU", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});

			setList((prevList) => [...prevList, { id: Date.now(), value, createdAt: dateString }]);
			setValue("");
			setError("");
		}
	};

	const listUl = (
		<ul className={styles["list"]}>
			{list.map(({ id, value, createdAt }) => (
				<li className={styles["list-item"]} key={id}>
					{value} <span className={styles["data-time"]}>({createdAt})</span>
				</li>
			))}
		</ul>
	);

	const noElementsText = <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>;

	return (
		<div className={styles.app}>
			<h1 className={styles["page-heading"]}>Ввод значения</h1>
			<p className={styles["no-margin-text"]}>
				Текущее значение <code>value</code>: "<output className={styles["current-value"]}>{value}</output>"
			</p>
			{error !== "" ? <div className={styles["error"]}>{error}</div> : ""}
			<div className={styles["buttons-container"]}>
				<button className={styles["button"]} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button className={styles["button"]} disabled={value.length < 3} onClick={onAddButtonClick}>
					Добавить в список
				</button>
			</div>
			<div className={styles["list-container"]}>
				<h2 className={styles["list-heading"]}>Список:</h2>
				{list.length > 0 ? listUl : noElementsText}
			</div>
		</div>
	);
};
