import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const CategoryListPage = () => {

    let params = useParams()
    let [query, setQuery] = useSearchParams()

    useEffect(() => {
        setTimeout(() => {
            setQuery({
                q: "test"
            })
        },3000)
    }, [setQuery])

    return (<>
        <p>

            Category Slug: {params.catSlug}
            Child Slug: {params.childCat}
        </p>

        <p>

            SearchQuery: {query.get('q')}
        </p>
    </>)
}

export default CategoryListPage;