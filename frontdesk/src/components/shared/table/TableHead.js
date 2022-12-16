import React from 'react'

const TableHead = (props) => {
	return (
		<thead>
			<tr className="">
				{props.columns.map((col) => (
					<th key={col} className="bg-[#E2E8F0] py-2 border border-gray-300">
						{col}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default TableHead