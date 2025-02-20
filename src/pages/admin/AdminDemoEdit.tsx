import {FC} from "react";
import {DemoProvider} from "../../utils/providers/DemoProvider.tsx";
import {DemoNameEdit} from "../../components/admin/demos/DemoNameEdit.tsx";
import {DemoDescriptionEdit} from "../../components/admin/demos/DemoDescriptionEdit.tsx";
import {DemoWidgetTimeToggle} from "../../components/admin/demos/DemoWidgetTimeToggle.tsx";
import {DemoWidgetsEdit} from "../../components/admin/demos/DemoWidgetsEdit.tsx";
import {DemoSave} from "../../components/admin/demos/DemoSave.tsx";

export const AdminDemoEdit:FC = () => {
    return (
        <div className="padding-bottom">
            <div className="service-details__item">
                <div className="service-details__item-inner">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <DemoProvider>
                            <DemoNameEdit />
                            <DemoDescriptionEdit />
                            <DemoWidgetTimeToggle />
                            <DemoWidgetsEdit />
                            <DemoSave />
                        </DemoProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}