module.exports = {
  apps : [{
    // 실행 프로세스(클러스터) 이름
    name      : "test-api",
    // 실행할 스크립트
    script    : "./app.js",
    // 실행 instance 수 (0,Max:CPU 코어 수 만큼(최대), -1: 최대-1, 2: 2만큼)
    instances : "0",
    // 실행모드
    exec_mode : "cluster",
    // 실제 앱이 구동되어 프로세스에서 ready를 보낼때까지 기다릴지 여부
    wait_ready: true,
    // 허용 반응시간, 초과 시 앱 강제 재시작
    listen_timeout: 5000,
    // 허용 메모리, 초과 시 앱 강제 재시작
    max_memory_restart: "4096M",
    // 앱 시작시 충돌이 발생할 경우 재시작 시간을 설정된 만큼 점차 늘림
    exp_backoff_restart_delay: 100,
    // 파일이 변경되었을 때 자동 재시작
    watch : false,
    // 에러 로그 파일
    error_file: "./log/err.log",
    // 기본 로그 파일
    out_file: "./log/out.log",
    // 로그에 사용할 일시 포맷
    log_date_format: "YYYY-MM-DD HH:mm:ss"
  }
]}