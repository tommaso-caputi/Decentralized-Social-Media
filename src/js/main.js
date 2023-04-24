window.onload = async () => {
    if (typeof window?.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            WALLET_CONNECTED = accounts[0];
            console.log({ WALLET_CONNECTED });
        } catch (error) {
            console.log({ error });
        }
    }
};