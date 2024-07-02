import {render, screen} from '../../test-utils'
import Posts from "../../pages/posts/Posts"
import {postsSampleData} from '../../mocks/dataSamples'



describe("Posts", () => {
    test("renders correctly  ", () => {
        render(<Posts/>)
        const header = screen.getByRole("heading", {
            level:1,
        })
        expect(header).toBeInTheDocument()
    })

})

  // test('renders a list of users', async() => {
    //     render(<Posts/>)
    //     const posts = await screen.findAllByRole("listitem")
    //     expect(posts).toHaveLength(postsSampleData.length)
    // })