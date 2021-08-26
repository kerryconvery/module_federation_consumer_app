import React from 'react'

const SuperCartButton = React.lazy(() => import('supercart/SuperCartButton'));
const EditVehicleDetailsButton = React.lazy(() => import ('amendments/EditVehicleDetailsButton'))
const PageFooter = React.lazy(() => import ('amendments/PageFooter'))

export const App = () => (
    <>
        <React.Suspense fallback='Loading EditVehicleDetailsButton'>
            <EditVehicleDetailsButton />
        </React.Suspense>
        <React.Suspense fallback='Loading SuperCartButton'>
            <SuperCartButton />
        </React.Suspense>
        <React.Suspense fallback='Loading EditVehicleDetailsButton'>
            <PageFooter />
        </React.Suspense>
    </>
)
