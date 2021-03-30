import Layout from "../../../components/Layout";
import Admin from "../../../components/authentication/Admin";
import Category from "../../../components/update/Category";
import Tag from "../../../components/update/Tag";
import Link from "next/link";
import CategoryIcon from "@material-ui/icons/Category";
import AddIcon from "@material-ui/icons/Add";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">
                <CategoryIcon style={{ color: "teal" }} />
                Create Catagories and Tags
                <LocalOfferIcon style={{ color: "red" }} />
              </h1>
            </div>
            <div className="col-md-6 pt-5 pb-5">
              <Category />
            </div>
            <div className="col-md-6 pt-5 pb-5">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
