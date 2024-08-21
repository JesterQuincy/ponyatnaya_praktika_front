import { Loader as LoaderIcon } from "lucide-react"

const Loader = () => {
    return (
        <div style={{flex: 'auto', justifyContent: 'center', alignItems: 'center'}}>
            <LoaderIcon style={{animation: 'spin 1s linear infinite;'}}/>
            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}