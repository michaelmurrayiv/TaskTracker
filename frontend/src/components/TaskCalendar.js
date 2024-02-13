import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./TaskCalendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function TaskCalendar() {
	const [events, setEvents] = useState([
		{
			start: moment().toDate(),
			end: moment().add(1, "days").toDate(),
			title: "Some title",
		},
	]);

	const onEventDrop = (data) => {
		console.log(data);
	};

	return (
		<div className="calendar">
			<DnDCalendar
				defaultDate={moment().toDate()}
				defaultView="month"
				events={events}
				localizer={localizer}
				onEventDrop={onEventDrop}
				resizable
			/>
		</div>
	);
}

export default TaskCalendar;
