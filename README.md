##How to Control GLtron game with Gesture

[![Gesture Controller](https://img.youtube.com/vi/QaUkOpIevXc/0.jpg)](http://www.youtube.com/watch?v=QaUkOpIevXc)

###Main Page
-	Connect : 블루투스로 연결된 모바일 기기와 SAP을 사용해 통신을 준비
-	Disconnect : SAP 통신을 위한 연결을 해제
-	Train : Gesture Training Page로 이동
-	Control : Gesture를 사용한 Remote Control Page로 이동 
  
###Training Page 
-	Label 선택 : Gesture의 종류를 결정하는 label을 선택. 같은 label에는 같은 동작만 학습.
-	Option 선택 : Gesture를 수행하는 시간의 길이를 선택
-	Start : Gesture를 수행하여 가속도 센서의 데이터를 Array 형태로 저장
-	Train : Array에 저장된 데이터를 파일 아웃 하여 전체 데이터와 합친 뒤 다시 파일 인 하여 Training을 진행 (Gesture 인식을 위한 방정식의 계수 생성)

###실시간 Gesture Control
-	SAP을 사용해 Mobile로 연결된 상태에서 Gesture를 인식시키면, 해당하는 명령을 Mobile로 전송
-	Option : 기기가 인식 할 Gesture의 시간 길이를 선택
-	Start : 실시간 Gesture 인식을 시작


###APIs

connect()
disconnet()
fetch()

dataModi()
dataSplit()

fileInit()

fileOut()
fileIn()

fileOutTrained()
fileInTrained()

training()

control()
