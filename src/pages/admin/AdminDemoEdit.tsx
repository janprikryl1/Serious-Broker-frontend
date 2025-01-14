import {FC} from "react";
import {DemoProvider} from "../../utils/providers/DemoProvider.tsx";
import {DemoNameEdit} from "../../components/modules/admin/demos/DemoNameEdit.tsx";
import {DemoDescriptionEdit} from "../../components/modules/admin/demos/DemoDescriptionEdit.tsx";
import {DemoWidgetsEdit} from "../../components/modules/admin/demos/DemoWidgetsEdit.tsx";
import {DemoSave} from "../../components/modules/admin/demos/DemoSave.tsx";
import {DemoWidgetTimeToggle} from "../../components/modules/admin/demos/DemoWidgetTimeToggle.tsx";

export const AdminDemoEdit:FC = () => {
    return (
        <DemoProvider>
            <DemoNameEdit />
            <DemoDescriptionEdit />
            <DemoWidgetTimeToggle />
            <DemoWidgetsEdit />
            <DemoSave />
        </DemoProvider>
    );
}