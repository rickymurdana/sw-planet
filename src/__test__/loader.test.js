import React from 'react'
import Enzyme, { render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import PlanetList from '../components/PlanetList'

Enzyme.configure({ adapter: new Adapter() })

describe('<PlanetList />', () => {
    it('should have Loader', () => {
        const Wrapper = render(<PlanetList />)
        expect(Wrapper.find('Loader')).toBeDefined()
    })
})