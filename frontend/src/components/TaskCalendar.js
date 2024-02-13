import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./TaskCalendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const token = localStorage.getItem("token");

function TaskCalendar() {
	const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/tasks/open", {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		})
    .then((response) => response.json())
    .then((data) => {
      const formatted = data.map((task) => ({
				title: task.description,
				start: moment(task.dueDate).startOf("day").toDate(),
				end: moment(task.dueDate).endOf("day").toDate(),
				allDay: true,
        id: task._id,
			}));
      setEvents(formatted);
    });
  }, [events, token]);

	 const moveEvent = ({ event, start, end }) => {
			const idx = events.indexOf(event);

			const updatedEvent = { ...event, start, end, allDay: true };
			const nextEvents = [...events];
			nextEvents.splice(idx, 1, updatedEvent);

			setEvents(nextEvents);
			console.log(updatedEvent);

       fetch(`http://localhost:9999/tasks/${event.id}/date`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${token}`, 
					},
					body: JSON.stringify({
						newDueDate: moment(start).format("YYYY-MM-DD"),
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Success:", data);
						setEvents(nextEvents);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
		};

  const CustomToolbar = (props) => {
		const navigate = (action) => {
			props.onNavigate(action);
		};

		const goToToday = () => {
			const now = new Date();
			props.date.setMonth(now.getMonth());
			props.date.setYear(now.getFullYear());
			props.onNavigate("TODAY", now);
		};

		const monthName = moment(props.date).format("MMMM YYYY");

		return (
			<div className="rbc-toolbar">
				<div className="toolbar-label">{monthName}</div>
				<div className="rbc-btn-group">
					<button type="button" onClick={goToToday}>
						Today
					</button>
					<button type="button" onClick={() => navigate("PREV")}>
						Prev
					</button>
					<button type="button" onClick={() => navigate("NEXT")}>
						Next
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="calendar">
			<DnDCalendar
				defaultDate={moment().toDate()}
				defaultView="month"
				events={events}
				localizer={localizer}
				onEventDrop={moveEvent}
				resizable={false}
				components={{
					toolbar: CustomToolbar,
				}}
			/>
		</div>
	);
}

export default TaskCalendar;
