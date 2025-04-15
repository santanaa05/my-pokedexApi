import { Button } from "@mui/material";

export default function paginacao({ addMore }) {

	return (
		<div className="paginacao">
			<Button onClick={addMore} variant="contained" color="success" sx={{ width: 250 }}>
				Ver mais +
			</Button>
		</div>
	)
}