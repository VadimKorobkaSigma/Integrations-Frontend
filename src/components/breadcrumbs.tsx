import * as React from "react";
import {RootStore} from "../stores/rootStore";
import {observer} from "mobx-react";
import MainContext from "../services/mainContext";
import {useContext} from "react";

export default observer((props: { scmId: string, orgId: string, postfix: string }) => {
    const stores = useContext(MainContext) as unknown as RootStore;
    const {scmId, orgId, postfix} = props;
    const scmName = stores.scmStore.getById(scmId)?.name;
    const orgName = stores.orgStore.getById(orgId)?.name;
    const resultItems = [
        scmName || scmId,
        orgName || orgId,
        postfix];

    return <nav>
        {resultItems.join(' / ')}
    </nav>;
})