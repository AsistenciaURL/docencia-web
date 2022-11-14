import { ReactNode, useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'

import AssistanceForm from 'components/assistance/AssitanceForm'
import Empty from 'layouts/Empty'
import PrimaryButton from 'components/core/PrimaryButton'
import StudentListItem from 'components/courses/StudentListItem'
import useDevices from 'hooks/useDevices'
import useQR from 'hooks/useQR'
import useAssistance from 'hooks/useAssistance'

export async function getServerSideProps({
  query
}: {
  query: { token: string; device: string }
}) {
  const { token, device } = query
  return {
    props: { token, deviceId: device }
  }
}

const AssistenceSession = ({
  deviceId,
  token
}: {
  token: string
  deviceId: string
}) => {
  const [permission, setPermission] = useState(false)
  const [message, setMessage] = useState<boolean | string>(false)
  const { getDevice, device } = useDevices()
  const { getQrWithToken, deviceOnQr } = useQR()
  const { assist } = useAssistance()

  useEffect(() => {
    getPermission()
  }, [])

  useEffect(() => {
    console.log(deviceOnQr)
  }, [deviceOnQr])

  const getPermission = async () => {
    const response = await getQrWithToken(token)

    if (!response.data?.used) {
      if (response.status === 'success') {
        const responseDevice = await getDevice(deviceId)
        if (responseDevice.status === 'error') {
          setMessage('Este dispositivo no esta registrado')
        } else {
          setPermission(true)
        }
      }
      if (response.status === 'error' || response.data?.deviceId !== deviceId) {
        setMessage('No tiene permitido el acceso a la asistencia')
      }
    } else {
      setMessage('Ya fue tomada su asistencia')
    }
  }

  const refetch = async () => {
    await getDevice(deviceId)
  }

  const confirmAssistance = async () => {
    const response = await assist(
      {
        courseId: deviceOnQr.qr?.courseId!,
        studentId: device.studentId!,
        qrId: deviceOnQr.qrId
      },
      token
    )
    console.log(response)
    if (response.status === 'success') {
      setMessage('Asistencia tomada correctamente')
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#2c79ff] via-[#0e46a7] to-[#082E71] w-screen h-screen flex justify-center items-center">
      <div className="md:w-1/3 ">
        <Card>
          <Fade in={true}>
            <CardContent>
              {!message && permission ? (
                <>
                  <Typography gutterBottom variant="h6" component="div">
                    {device && device.student
                      ? 'Confirmar asistencia'
                      : 'Ingrese el carnet para tomar asistencia'}
                  </Typography>
                  {device && device.student && (
                    <div>
                      <Divider />
                      <StudentListItem
                        email={device.student.email}
                        id={device.student.id!}
                        name={device.student.name}
                      />
                    </div>
                  )}
                  <div>
                    {device && device.student ? (
                      <div>
                        <PrimaryButton
                          label="Confirmar asistencia"
                          onClick={confirmAssistance}
                        />
                      </div>
                    ) : (
                      <AssistanceForm deviceId={deviceId} refetch={refetch} />
                    )}
                  </div>
                </>
              ) : (
                <div>
                  {message && (
                    <div className="flex justify-center items-center -mb-1">
                      <Typography variant="h6" component="div">
                        {message}
                      </Typography>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Fade>
        </Card>
      </div>
    </div>
  )
}

AssistenceSession.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default AssistenceSession
