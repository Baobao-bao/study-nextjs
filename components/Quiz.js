import {TextField, IconButton} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function Quiz() {
    return (
        <div>
            <div>
                <TextField label="Question" variant="standard" fullWidth />
            </div>
            <div className="mt-4">
                <TextField label="Option" />
                <TextField label="Option" />
                <TextField label="Option" />
                <TextField label="Option" />
                <IconButton color="primary" aria-label="upload picture"  size="large">
                  <PhotoCamera />
                </IconButton>
            </div>
        </div>
    );
}
