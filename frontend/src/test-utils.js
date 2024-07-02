import React from 'react'
import {render} from '@testing-library/react'
import { AuthContextProvider } from './context/AuthContext'
import { PostsProvider } from './context/PostsContext'
import { AllUserPostStatusProvider } from './context/AllUserPostStatusContext'
import { UserPostStatusProvider } from './context/UserPostStatusContext'
import { FilterProvider } from './context/FilterContext'
import { BrowserRouter } from 'react-router-dom'

const AllTheProviders = ({children}) => {
  return (
    <AuthContextProvider>
        <PostsProvider>
            <AllUserPostStatusProvider>
                <UserPostStatusProvider>
                    <FilterProvider>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </FilterProvider>
                </UserPostStatusProvider>
            </AllUserPostStatusProvider>
        </PostsProvider>
    </AuthContextProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}