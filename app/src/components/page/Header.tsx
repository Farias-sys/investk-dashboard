import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Header(){

    return(
        <>
        <div className="header px-6 py-2 items-center text-center border-b">
            <h1 className="text-4xl font-bold"><AccountBalanceWalletIcon fontSize={"large"}/> InvestK</h1>
            <h2 className='text-sm font-extralight'>Investimentos de forma inteligente</h2>
        </div>
        </>
    )
}