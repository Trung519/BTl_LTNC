export const TransferUserNameIntoID = (listReceivers) => {
    const listID = []
    for (let i in listReceivers) {
        listID.push(listReceivers[i].ID);
    }

    return listID;
};
