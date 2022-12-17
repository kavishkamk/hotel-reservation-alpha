import React from 'react'

const PageContainer = (props) => {
	return (
		<div className="relative top-16 bg-[#E2E8F0] min-h-[calc(100vh-6.5rem)]">
			{props.children}
		</div>
	)
}

export default PageContainer